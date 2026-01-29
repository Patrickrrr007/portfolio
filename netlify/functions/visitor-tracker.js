// Netlify Function to track and retrieve website visitor statistics
// This function handles both tracking visits and retrieving counts

// For production use, replace this with a database connection:
// - MongoDB Atlas (free tier available)
// - Upstash Redis (free tier available)
// - Supabase (free tier available)
// - PlanetScale (free tier available)

// Simple in-memory storage (resets on function cold start)
// In production, replace with database calls
let storage = {
  totalVisits: 0,
  uniqueVisitors: new Map(), // Map<visitorId, lastVisit>
  initialized: false,
};

// Initialize with default values
function initializeStorage() {
  if (!storage.initialized) {
    // Try to get from environment variable or start fresh
    // In production, load from database here
    storage.totalVisits = parseInt(process.env.VISITOR_COUNT || '0', 10);
    storage.initialized = true;
  }
}

exports.handler = async (event, context) => {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    initializeStorage();

    // Get visitor information
    const ip = event.headers['x-forwarded-for']?.split(',')[0] || 
               event.headers['x-nf-client-connection-ip'] || 
               context.clientContext?.ip || 
               'unknown';
    const userAgent = event.headers['user-agent'] || 'unknown';
    const timestamp = new Date().toISOString();

    // Create a unique identifier for the visitor
    const crypto = require('crypto');
    const visitorId = crypto
      .createHash('md5')
      .update(`${ip}-${userAgent}`)
      .digest('hex');

    // Check query parameters
    const { path } = event;
    const isTracking = path.includes('track') || event.queryStringParameters?.action === 'track';
    const isGettingCount = path.includes('count') || event.queryStringParameters?.action === 'count';

    let responseData = {
      totalVisits: storage.totalVisits,
      uniqueVisitors: storage.uniqueVisitors.size,
    };

    // Track the visit if this is a tracking request
    if (isTracking) {
      const isNewVisitor = !storage.uniqueVisitors.has(visitorId);
      
      if (isNewVisitor) {
        storage.uniqueVisitors.set(visitorId, timestamp);
      }
      
      storage.totalVisits++;
      
      responseData = {
        totalVisits: storage.totalVisits,
        uniqueVisitors: storage.uniqueVisitors.size,
        isNewVisitor,
        message: 'Visit tracked successfully',
      };
    } else {
      // Just return the count
      responseData.message = 'Visitor count retrieved successfully';
    }

    // Return response
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(responseData),
    };
  } catch (error) {
    console.error('Error in visitor tracker:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: 'Failed to process visitor request',
        totalVisits: storage.totalVisits || 0,
        uniqueVisitors: storage.uniqueVisitors?.size || 0,
      }),
    };
  }
};
