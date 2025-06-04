// Animación de partículas
document.addEventListener('DOMContentLoaded', function() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Tamaño aleatorio entre 1 y 3px
        const size = Math.random() * 2 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Posición aleatoria
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.bottom = `-10px`;
        
        // Duración de animación aleatoria
        const duration = Math.random() * 10 + 10;
        particle.style.animationDuration = `${duration}s`;
        
        // Retraso aleatorio
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particlesContainer.appendChild(particle);
    }

    // Red neuronal animada
    const networkContainer = document.getElementById('neuralNetwork');
    
    // Configuración de la red
    const layers = [
        { neurons: 5, left: '10%' },   // Capa de entrada
        { neurons: 8, left: '35%' },   // Capa oculta 1
        { neurons: 6, left: '60%' },   // Capa oculta 2
        { neurons: 3, left: '85%' }    // Capa de salida
    ];
    
    // Crear neuronas
    layers.forEach((layer, layerIndex) => {
        const layerDiv = document.createElement('div');
        layerDiv.className = `layer layer-${layerIndex + 1}`;
        
        for (let i = 0; i < layer.neurons; i++) {
            const neuron = document.createElement('div');
            neuron.className = 'neuron';
            
            // Animación con retraso aleatorio
            neuron.style.animationDelay = `${Math.random() * 2}s`;
            
            layerDiv.appendChild(neuron);
        }
        
        networkContainer.appendChild(layerDiv);
    });
    
    // Crear conexiones entre neuronas
    for (let i = 0; i < layers.length - 1; i++) {
        const currentLayer = document.querySelector(`.layer-${i + 1}`);
        const nextLayer = document.querySelector(`.layer-${i + 2}`);
        
        const currentNeurons = currentLayer.querySelectorAll('.neuron');
        const nextNeurons = nextLayer.querySelectorAll('.neuron');
        
        currentNeurons.forEach(currentNeuron => {
            nextNeurons.forEach(nextNeuron => {
                const connection = document.createElement('div');
                connection.className = 'connection';
                
                // Posicionar la conexión
                const startRect = currentNeuron.getBoundingClientRect();
                const endRect = nextNeuron.getBoundingClientRect();
                
                const networkRect = networkContainer.getBoundingClientRect();
                
                const startX = startRect.left - networkRect.left + startRect.width / 2;
                const startY = startRect.top - networkRect.top + startRect.height / 2;
                const endX = endRect.left - networkRect.left + endRect.width / 2;
                const endY = endRect.top - networkRect.top + endRect.height / 2;
                
                const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
                const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
                
                connection.style.width = `${length}px`;
                connection.style.left = `${startX}px`;
                connection.style.top = `${startY}px`;
                connection.style.transform = `rotate(${angle}deg)`;
                
                // Animación con retraso aleatorio
                connection.style.animationDelay = `${Math.random() * 3}s`;
                
                networkContainer.appendChild(connection);
            });
        });
    }

    // Efecto de scroll
    window.addEventListener('scroll', revealOnScroll);

    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const revealTop = reveals[i].getBoundingClientRect().top;
            const revealPoint = 150;
            
            if (revealTop < windowHeight - revealPoint) {
                reveals[i].classList.add('active');
            } else {
                reveals[i].classList.remove('active');
            }
        }
    }

    // Inicializar elementos visibles al cargar la página
    revealOnScroll();
});