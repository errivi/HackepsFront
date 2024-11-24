window.onload = function() {
    // Cargar los 4 más famosos
    fetch('http://127.0.0.1:5502/tramites/obtener-tramites')
        .then(response => {
            console.log('Response:', response);

            // Verificar si la respuesta es exitosa (status 200-299)
            if (!response.ok) {
                throw new Error(`Error en la respuesta HTTP: ${response.status}`);
            }

            // Leer la respuesta como JSON
            return response.json();
        })
        .then(newTitles => {
            // Depurar los datos JSON que recibimos
            console.log('Nuevos títulos:', newTitles);

            // Mostrar los títulos en la página
            displayTitles(newTitles); // Pasamos los nuevos títulos a la función displayTitles
        })
        .catch(error => {
            // Mostrar un mensaje de error en caso de que algo falle
            console.error('Error al pedir títulos de trámites:', error);
        });
};

// Función para mostrar los títulos
function displayTitles(titles) {
    const titlesDisplay = document.getElementById('titlesDisplay');
    titlesDisplay.innerHTML = ''; // Limpiar contenido anterior

    // Iterar sobre los títulos recibidos
    titles.forEach((title) => {
        if (title) {
            const titleItem = document.createElement('div');
            titleItem.className = 'title-item';
            titleItem.textContent = title.trim(); // Mostrar solo el título
            
            // Añadir evento de clic al título
            titleItem.addEventListener('click', function() {
                handleClick(title.trim()); // Llamar a handleClick con el título
            });

            titlesDisplay.appendChild(titleItem);
        }
    });
}

// Función para manejar el clic y realizar la llamada GET
function handleClick(titulo) {
    console.log(`Clic en el título: ${titulo}`);

    // Llamada al backend para obtener el ranking del trámite específico
    fetch(`http://127.0.0.1:5502/tramites/obtener-ranking?titulo=${encodeURIComponent(titulo)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al obtener el ranking: ${response.status}`);
            }
            return response.json();
        })
        .then(newTitles => {
            console.log('Ranking actualizado:', newTitles);

            // Actualizar la visualización de títulos
            displayTitles(newTitles);
        })
        .catch(error => {
            console.error('Error al actualizar los títulos:', error);
        });
}

