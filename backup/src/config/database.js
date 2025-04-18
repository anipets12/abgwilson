import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';
let prisma = null;
let supabase = null;
export const initializeDatabases = (env) => {
    if (!prisma) {
        prisma = new PrismaClient();
    }
    if (!supabase) {
        supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY, {
            auth: { persistSession: false },
            db: { schema: 'public' }
        });
    }
    return { prisma, supabase };
};
