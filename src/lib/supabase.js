import { createClient } from '@supabase/supabase-js';

// Supabase URL and Keys from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Generic function to create Supabase client
export const createSupabaseClient = (useServiceRole = false) => {
    if (!supabaseUrl) {
        throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
    }

    const key = useServiceRole ? supabaseServiceKey : supabaseAnonKey;

    if (!key) {
        throw new Error(
            `Missing ${useServiceRole ? 'SUPABASE_SERVICE_ROLE_KEY' : 'NEXT_PUBLIC_SUPABASE_ANON_KEY'} environment variable`
        );
    }

    return createClient(supabaseUrl, key, {
        auth: {
            autoRefreshToken: !useServiceRole,
            persistSession: !useServiceRole,
        },
    });
};

// Helper function to check if we're on the server
export const isServer = typeof window === 'undefined';

// Get the appropriate client based on environment - create on demand
export const getSupabaseClient = (useServiceRole = false) => {
    return createSupabaseClient(useServiceRole);
};

// Default client for general use (client-side) - create on demand
export const getSupabase = () => {
    return createSupabaseClient(false);
};

// Lazy-loaded clients to avoid initialization errors
let _supabase = null;
let _supabaseAdmin = null;

// Default client for general use (client-side)
export const supabase = new Proxy({}, {
    get(target, prop) {
        if (!_supabase) {
            _supabase = createSupabaseClient(false);
        }
        return _supabase[prop];
    }
});

// Service role client for server-side operations
export const supabaseAdmin = new Proxy({}, {
    get(target, prop) {
        if (!_supabaseAdmin) {
            _supabaseAdmin = createSupabaseClient(true);
        }
        return _supabaseAdmin[prop];
    }
}); 