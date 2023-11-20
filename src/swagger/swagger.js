import swaggerJsdoc from "swagger-jsdoc";
import __dirname from "../utils.js";

export const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentación Proyecto Final curso Backend Ecommerce 2023",
      description: `Documentación de la API del proyecto final.\n
      Esta documentación tiene como finalidad poder consumir la api generada en mi servidor.\n
      El proyecto ha sido realizado con EXPRESS JS, NODE JS, JAVASCRIPT, MONGO DB, HANDLEBARS.\n
      El proyecto se trata en realizar el backend de una ecommerce completa.\n
      Información adicional sobre el proyecto:\n
        * API para el manejo de productos (con websockets)
        * API para el manejo de categorías
        * API para el manejo de la autenticación y autorización
        * API para el carrito de compras
        * API para los tickets de una compra
        * Reestablecimiento de la contraseña
        * Verificación del correo del usuario a través de un mail.
        * Interfaz gráfica utilizando el motor de plantillas handlebars.
        * Estilos proporcionados con CSS y Boostrap.\n
       Datos del cursado:\n
        * Año: 2023
        * Comisión: 52135
        * Del 20-05-2023 al 11-11-2023
        * Profesor: Arturo Verbel de Leon
        * Tutor: Alan Alexis Galvan\n
        Repositorio de github del proyecto: https://github.com/DarioLopez18/ProyectoFinalBackEndEcommerceCoderHouse2023 \n
        Información de contacto: \n
        * Email: darioangellopez38@gmail.com
        * Whatsapp: +54 9 261 615 0281
        * Linkedin: https://www.linkedin.com/in/dario-angel-jose-lopez-2a3202234/
        * Github: https://github.com/DarioLopez18
      `,
    },
  },
  apis: [__dirname + "/swagger/docs/**/*.yaml"],
};

export const specs = swaggerJsdoc(swaggerOptions);
