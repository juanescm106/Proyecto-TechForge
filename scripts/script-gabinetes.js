// Obtener el ID del producto de la URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id'); // Ejemplo: "G1"

// Cargar los datos de los productos desde productos.json
fetch('../productos.json')
    .then(response => response.json())
    .then(data => {
        // Buscar el producto en la categoría "Gabinetes"
        const category = data["Gabinetes"];
        const product = category.find(item => item.id === productId);

        if (product) {
            // Actualizar los elementos de la página con los datos del gabinete
            document.querySelector('.product-title').textContent = product.nombre;
            document.querySelector('.product-image').src = product.imagen;
            document.querySelector('.product-price').textContent = product.precio;

            // Cargar la descripción como párrafos
            const descripcionContainer = document.getElementById('descripcion');
            descripcionContainer.innerHTML = ""; // Limpia contenido previo
            product.descripcion.forEach(paragraph => {
                const p = document.createElement('p');
                p.textContent = paragraph;
                p.style.marginBottom = "1rem"; // Espacio entre párrafos
                descripcionContainer.appendChild(p);
            });

            // Cargar dinámicamente las opciones del producto
            const optionsContainer = document.getElementById('product-options');
            product.opciones.forEach(option => {
                const label = document.createElement('label');
                label.textContent = option.label + ":";
                label.style.display = "block";
                label.style.marginTop = "1rem";

                const select = document.createElement('select');
                select.id = option.label.toLowerCase(); // Ejemplo: "tipo", "color"
                select.style.display = "block";
                select.style.marginTop = "0.5rem";

                option.opciones.forEach(value => {
                    const opt = document.createElement('option');
                    opt.value = value;
                    opt.textContent = value;
                    select.appendChild(opt);
                });

                optionsContainer.appendChild(label);
                optionsContainer.appendChild(select);
            });
        } else {
            document.body.innerHTML = "<h1>Gabinete no encontrado</h1>";
        }
    })
    .catch(error => {
        console.error('Error al cargar los datos del producto:', error);
        document.body.innerHTML = "<h1>Error al cargar el producto</h1>";
    });
