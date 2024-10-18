FROM node:20.16-alpine3.19

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --omit=dev && npm cache clean --force

# Copy each file and folder from dist to the WORKDIR
COPY dist/ ./src

# Copy prisma folder
COPY prisma/ ./prisma

# Generate Prisma Client
RUN npx prisma generate

# Run the application
CMD ["node", "src/index.js"]