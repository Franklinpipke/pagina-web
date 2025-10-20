// ========================================
// EFECTO SUTIL DE SEGUIMIENTO DEL MOUSE
// mouse-effects.js
// ========================================

(function() {
    'use strict';

    let mouseFollower;
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    // Inicializar
    function init() {
        createMouseFollower();
        
        document.addEventListener('mousemove', handleMouseMove);
        
        // Animar el seguidor con suavidad
        animateFollower();
        
        // Detectar hover en elementos interactivos
        setupHoverDetection();
    }

    // Crear el círculo que sigue al mouse
    function createMouseFollower() {
        mouseFollower = document.createElement('div');
        mouseFollower.className = 'mouse-follower';
        document.body.appendChild(mouseFollower);
    }

    // Capturar posición del mouse
    function handleMouseMove(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Crear rastro ocasionalmente
        if (Math.random() > 0.85) {
            createTrailCircle(mouseX, mouseY);
        }
    }

    // Animar el círculo con efecto de retraso suave
    function animateFollower() {
        // Interpolación suave (easing)
        const speed = 0.15;
        followerX += (mouseX - followerX) * speed;
        followerY += (mouseY - followerY) * speed;
        
        if (mouseFollower) {
            mouseFollower.style.left = followerX + 'px';
            mouseFollower.style.top = followerY + 'px';
        }
        
        requestAnimationFrame(animateFollower);
    }

    // Crear círculos del rastro
    function createTrailCircle(x, y) {
        const trail = document.createElement('div');
        trail.className = 'mouse-trail-circle';
        trail.style.left = (x - 5) + 'px';
        trail.style.top = (y - 5) + 'px';
        document.body.appendChild(trail);
        
        // Eliminar después de la animación
        setTimeout(() => trail.remove(), 600);
    }

    // Detectar cuando el mouse está sobre elementos interactivos
    function setupHoverDetection() {
        const interactiveSelectors = 'a, button, .product-card, .nav-item, .btn, input, select';
        
        document.addEventListener('mouseover', (e) => {
            if (e.target.matches(interactiveSelectors) || e.target.closest(interactiveSelectors)) {
                mouseFollower.classList.add('hover');
            }
        });
        
        document.addEventListener('mouseout', (e) => {
            if (e.target.matches(interactiveSelectors) || e.target.closest(interactiveSelectors)) {
                mouseFollower.classList.remove('hover');
            }
        });
    }

    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();