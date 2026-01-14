-- Corrigir avisos de segurança

-- 1. Adicionar search_path à função update_updated_at (que estava sem)
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- 2. Atualizar política de newsletter para ser mais restritiva
-- Removemos a política permissiva e criamos uma mais específica
DROP POLICY IF EXISTS "Qualquer um pode se inscrever na newsletter" ON public.newsletter_subscribers;

CREATE POLICY "Visitantes podem se inscrever com email válido"
  ON public.newsletter_subscribers FOR INSERT
  WITH CHECK (
    email IS NOT NULL AND 
    email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' AND
    is_active = true
  );