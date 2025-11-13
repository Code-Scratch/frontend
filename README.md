# 🎮 Frontend — Code Scratch

Este repositorio contiene el **frontend** de la aplicación, donde se encuentra toda la **lógica del juego** junto con otros componentes visuales e interactivos del proyecto.
El frontend esta construido usando como lenguaje principal TypeScript, y con las bibliotecas de React y Phaser, donde la ultima es la proveedora y encargada del juego en si.

---

## Instalación

Sigue estos pasos para clonar e iniciar el proyecto:

### 1️⃣ Clonar el repositorio

Copia el siguiente comando y ejecútalo en tu consola **Bash**:

```bash
git clone https://github.com/Code-Scratch/frontend.git
```

2️⃣ Ingresar a la carpeta del proyecto
```bash
cd frontend
```

3️⃣ (Opcional) Actualizar ramas del proyecto
```bash
git pull
```

4️⃣ Instalar dependencias
```bash
npm install
```

5️⃣ Levantar el proyecto en modo desarrollo
```bash
npm run dev
```

⚙️ Requisitos adicionales

Para que el ciclo completo de la aplicación funcione correctamente, también se debe tener levantado el backend del proyecto, el cual esta en esta misma organizacion (apartado de repositorios) llamado "backend".

Una vez ejecutado el juego, dentro del mismo hay una explicacion de las reglas y como jugar, gracias por leer!

🧩 Tecnologías usadas:

⚛️ React

🧠 TypeScript

⚡ Vite

🧰 npm

🧩 Phaser 3

## Como jugar

El juego es simple y facil de comprender, pero explicare de todas formas las distintas etapas que tiene el juego.

### 1️⃣ Iniciar Sesion
 Antes de poder jugar, se te va a pedir iniciar sesion con tu cuenta de google.

<img width="1904" height="945" alt="{15A4DB93-585C-45EB-9382-CAEA0AE4B148}" src="https://github.com/user-attachments/assets/a89b28cb-60bc-46e5-91f7-b0f7a81a3a6a" />



### 2️⃣ Darle a jugar
Posterior a iniciar sesion, el boton de jugar se desbloqueara y podras darle.

<img width="1907" height="952" alt="{CFBBAC34-DF27-448D-8179-B3A7E921906A}" src="https://github.com/user-attachments/assets/b706e549-764a-4732-b1e4-16c7abaa4718" />


### 3️⃣ Jugar y sus reglas
Una vez dentro del juego, el mismo va a empezar arrancando por su lobby

<img width="1906" height="945" alt="{9D79D830-50C9-4FDE-BBE5-E445541995E4}" src="https://github.com/user-attachments/assets/712b7c4c-98dd-4ad1-9b0b-87ca458f3373" />


- A partir de darle click a la pantalla, va a arrancar la escena del juego


<img width="1908" height="948" alt="{761C676D-3596-4D83-9BB0-27820C91391C}" src="https://github.com/user-attachments/assets/cec4d779-e056-40d0-b4ae-8e8d0ae2b916" />


- El juego como dije previamente, es sencillo y tiene un objetivo facil de comprender.


#### Mecanicas:

El juego como dije previamente, es sencillo y tiene un objetivo facil de comprender. El juego consta de las siguientes mecanicas:

##### Timer:

- Dentro de la escena, habra un timer arriba a la derecha, el cual ira bajando a medida que pasa el tiempo, el mismo es el tiempo que tienes para poder completar el juego

<img width="109" height="84" alt="{3A0A5A15-FFB6-4DE7-9815-9F7972205861}" src="https://github.com/user-attachments/assets/e70d84fd-b25c-4646-af1f-6a9aa837af73" />

##### Enemigo:

- El juego tiene un enemigo a derrotar, el cual tiene una cantidad de vida que iras pudiendo bajar con una mecanica que se explicara mas adelante

<img width="296" height="411" alt="{2D1DE23B-DA3B-4D09-8D97-86D498352949}" src="https://github.com/user-attachments/assets/b88739e8-3088-4674-aeee-16d3c34334fd" />


##### Player Best y Points:

En la esquina superior izquieda, se mostrara la siguiente informacion:

- Player Best: Sera el puntaje maximo del usuario de todas sus sesiones de juego, al iniciar sesion por primera vez la misma sera de 0.

- Points: Es el puntaje de la sesion actual de juego, el cual ira subiendo con la mecanica que se explicara en el siguiente punto.

<img width="379" height="100" alt="{ED821F6C-268D-4901-941E-6159D18D98DB}" src="https://github.com/user-attachments/assets/3427f07b-768e-4e49-bfcd-63c64fd20390" />


##### El tablero Match-3:

- La parte primoridial del juego y con la cual todos los puntos anteriores toman sentido, el tablero consta de filas y columnas (un 8x8 para ser concretos) en las cuales hay piezas (diamantes en este caso) de diferentes colores:


<img width="657" height="664" alt="{24C96395-AE5E-4307-A59A-0DFE215A4132}" src="https://github.com/user-attachments/assets/16929e2e-d65b-407a-afe3-57453748017a" />



- El objetivo del juego es simple: Hacer match entre 3 o mas piezas:

- Primera parte: Intercambiando una pieza por cualquiera que este en sus costados:
  

<img width="642" height="649" alt="{68F906AE-1758-4535-A4E7-1A089A4EBCAC}" src="https://github.com/user-attachments/assets/fe672f5c-fa9a-4022-ab6f-7d441cf48bca" />



- Segunda parte: Validacion del intercambio y eliminacion de la fila del tablero:


<img width="634" height="644" alt="{68734655-0294-46EA-B895-BA90B766CC6A}" src="https://github.com/user-attachments/assets/2be5ef81-ae9b-4bd8-82bc-da874472a4fe" />


- A la hora de hacer el match, se le restara vida al enemigo y se incrementaran los Points:


<img width="729" height="794" alt="{30A26325-ED16-4552-AABC-1057D30F538B}" src="https://github.com/user-attachments/assets/3ba2ec98-c27e-4a4a-9b39-ff2455a2307c" />



#### IMPORTANTE
- Si el movimiento no es valido (no hay match posterior al intercambio entre las piezas) la misma volvera a su lugar:

- 1️⃣ :

<img width="627" height="641" alt="{AC87E53B-6791-44B6-97E8-A9550194E2DC}" src="https://github.com/user-attachments/assets/663caa75-719e-4069-9ae3-f7da06ac85d8" />


- 2️⃣ :

<img width="628" height="636" alt="{6D21249C-7324-4390-ACD5-6338740F9E29}" src="https://github.com/user-attachments/assets/ebd7b1aa-6d6a-41e9-9935-7a64f2d9f2ee" />


- Dentro del juego tiene todo una animacion, que evidentemente en las capturas no se logran apreciar.


  
##### Game Over:

- Como se logra "completar" el juego? Esto puede lograrse por 2 caminos:
- La primera es que se te acabo el tiempo, el timer llego a 0 y el juego finalizara automaticamente:

- 1️⃣ :

   <img width="1903" height="944" alt="{44262E15-7621-44B0-A6A1-9CB17053ED6E}" src="https://github.com/user-attachments/assets/a8e36180-24e0-4933-8427-cdba058d7ec5" />


- 2️⃣ :

  <img width="1902" height="937" alt="{CD4E3992-2F87-496A-857A-020F3006238E}" src="https://github.com/user-attachments/assets/be2ba0a5-2a12-468b-81b9-fb8c855d9fb3" />

  - La misma pantalla de Game Over te mostrara un mensaje explicando la razon por la que termino el juego, como a su vez tu puntaje final.


- La segunda opcion es que lograste derrotar al enemigo, por ende cumpliste el objetivo idoneo del juego, felicidades!!

<img width="1904" height="954" alt="{685ED9D6-C718-4EC6-8510-10FC17B530E3}" src="https://github.com/user-attachments/assets/0bf77fdf-5d61-438d-9bc8-cdb6ca146644" />












