# Backend Reference for Recipe Room

## Authentication Endpoints

### POST https://back-end-recipe-room-phase-5-production.up.railway.app/api/auth/register
Required fields:
- username (string)
- email (string) 
- password (string)

### POST https://back-end-recipe-room-phase-5-production.up.railway.app/api/auth/login
Required fields:
- username (string) - NOT email!
- password (string)

Response includes:
- token (JWT token)
- user object with: id, username, email, profile_image, created_at

### GET https://back-end-recipe-room-phase-5-production.up.railway.app/api/auth/profile
Requires: Authorization Bearer token
Returns user profile data

## Recipe Endpoints

### GET https://back-end-recipe-room-phase-5-production.up.railway.app/api/recipes
Returns array of recipes with fields:
- id
- title
- description
- image_url (THIS IS THE IMAGE FIELD - not 'image')
- ingredients (array)
- instructions (string)
- serving_size
- country
- user_id
- created_at
- updated_at
- group_id

### POST https://back-end-recipe-room-phase-5-production.up.railway.app/api/recipes
Creates new recipe, requires auth token

### PUT https://back-end-recipe-room-phase-5-production.up.railway.app/api/recipes/{id}
Updates existing recipe, requires auth token

### DELETE https://back-end-recipe-room-phase-5-production.up.railway.app/api/recipes/{id}
Deletes recipe, requires auth token

### GET https://back-end-recipe-room-phase-5-production.up.railway.app/api/recipes/search?q={term}
Search recipes by term

## Key Frontend Mappings Needed:
- Backend uses `image_url` field
- Frontend RecipeCard component expects `recipe.image`
- Need to map image_url -> image in frontend OR update component to use image_url

## Current Issue:
RecipeCard component uses `recipe.image` but backend sends `image_url`

## backend .env
DATABASE_URL=postgresql://recipe_room_phase5_user:DPczxJJD4dvopyLOhuOOdSYYvv76kfOy@dpg-d22v7du3jp1c739bf110-a.oregon-postgres.render.com/recipe_room_phase5
JWT_SECRET_KEY=080d428112d8a2d83734cbfb58fa924209e59b61bf06f0600b51cc2fc82d2e6f
# Cloudinary Configuration 
CLOUDINARY_CLOUD_NAME=dnzvxc6id
CLOUDINARY_API_KEY=612634752325927
CLOUDINARY_API_SECRET=uHD1pZqdJeqBJ-dRJCxvsr11nDU
