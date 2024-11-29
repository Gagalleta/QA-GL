FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia la app
COPY . .

# Expone el puerto
EXPOSE 3000

# iniciar aplicación
CMD ["npm", "start"]