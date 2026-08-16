FROM node:22-bookworm-slim

WORKDIR /workspace

ENV NEXT_TELEMETRY_DISABLED=1

COPY . .
COPY mems-catalans-entrypoint.sh /usr/local/bin/mems-catalans-entrypoint

RUN npm install --force --ignore-scripts \
  && chmod +x /usr/local/bin/mems-catalans-entrypoint

EXPOSE 8080

ENTRYPOINT ["mems-catalans-entrypoint"]
CMD ["npm", "run", "dev"]
