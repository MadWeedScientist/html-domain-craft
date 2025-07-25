
-- Drop the existing restrictive RLS policy that's blocking authentication
DROP POLICY IF EXISTS "Allow admin users to view their own records" ON public.admin_users;

-- Create a new policy that allows reading admin records for authentication purposes
-- This is needed so the login process can verify credentials
CREATE POLICY "Allow reading admin records for authentication" 
ON public.admin_users 
FOR SELECT 
USING (true);

-- Prevent any modifications to admin records (no INSERT, UPDATE, DELETE)
-- This ensures only database administrators can manage admin accounts
CREATE POLICY "Prevent modifications to admin records" 
ON public.admin_users 
FOR ALL 
USING (false) 
WITH CHECK (false);

-- Override the prevent policy specifically for SELECT operations
DROP POLICY IF EXISTS "Prevent modifications to admin records" ON public.admin_users;

CREATE POLICY "Prevent admin record modifications except select" 
ON public.admin_users 
FOR INSERT, UPDATE, DELETE 
USING (false) 
WITH CHECK (false);
