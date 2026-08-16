FROM node:22-bookworm-slim

WORKDIR /workspace

ENV NEXT_TELEMETRY_DISABLED=1

COPY . .
COPY docker-entrypoint.sh /usr/local/bin/meme-studio-entrypoint

RUN npm install --force --ignore-scripts \
  && chmod +x /usr/local/bin/meme-studio-entrypoint

EXPOSE 8080

ENTRYPOINT ["meme-studio-entrypoint"]
CMD ["npm", "run", "dev"]
