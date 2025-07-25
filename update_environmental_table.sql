-- Script de mise à jour pour ajouter le champ image_url à la table environmental_commitments
-- À exécuter dans votre base de données Supabase

-- Ajouter la colonne image_url à la table environmental_commitments
ALTER TABLE environmental_commitments 
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Commentaire pour documenter le nouveau champ
COMMENT ON COLUMN environmental_commitments.image_url IS 'URL de l''image Cloudinary (optionnel). Si NULL, l''emoji sera utilisé comme fallback.';

-- Vérifier que la colonne a été ajoutée
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'environmental_commitments' 
AND column_name = 'image_url'; 