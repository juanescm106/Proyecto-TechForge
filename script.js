// Obtener el ID del producto de la URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Cargar los datos del producto desde productos.json
fetch('productos.json')
    .then(response => response.json())
    .then(data => {
        const product = data.find(item => item.id == productId);

        if (product) {
            // Actualizar los elementos de la página con los datos del producto
            document.querySelector('.product-title').textContent = product.name;
            document.querySelector('.product-image').src = product.image;
            document.querySelector('.product-price').textContent = product.price;
            document.querySelector('.product-description p').textContent = product.description;

            // Agregar opciones de color
            const colorSelect = document.getElementById('color');
            product.colorOptions.forEach(color => {
                const option = document.createElement('option');
                option.textContent = color;
                colorSelect.appendChild(option);
            });

            // Agregar opciones de tamaño
            const sizeSelect = document.getElementById('size');
            product.sizeOptions.forEach(size => {
                const option = document.createElement('option');
                option.textContent = size;
                sizeSelect.appendChild(option);
            });
        } else {
            document.body.innerHTML = "<h1>Producto no encontrado</h1>";
        }
    })
    .catch(error => console.error('Error al cargar los datos del producto:', error));
