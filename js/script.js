const input = document.getElementById('input');
const alert = document.getElementById('alert');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const globalRe = /^((\d*\.)?\d+|(\d*\s*?\,\s*)?\d+|(\d*\,)?\d+)+$/igm;

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
}

function validate() {
    if(input.value == '') {
        alert.innerHTML = 'Please enter your numbers.';
        alert.classList.add('app__alert--show');
        input.style.borderColor = '#e03227';
        input.focus();
        return false;
    }

    const localRe = /^((\d*\.)?\d+|(\d*\s*?\,\s*)?\d+|(\d*\,)?\d+)+$/igm;

    if(!localRe.test(input.value)) {
        alert.innerHTML = `You can't pull the wool over my eyes.`;
        alert.classList.add('app__alert--show');
        input.style.borderColor = '#e03227';
        input.focus();
        return false;
    }
    
    function calc() {
        modal.showModal();

        const serie = input.value.split(',');

        const sum = serie.reduce((a, b) => a + Number(b), 0);
        
        const mean = sum / serie.length;
        
        document.getElementById('mean').innerHTML = `Your mean is <b class="result">${mean.toFixed(1)}</b>!`;
    }

    calc(remove());
}

closeModal.addEventListener('click', function() {
    modal.close();
    input.value = '';
});

function remove() {
    alert.classList.remove('app__alert--show');
    input.removeAttribute('style');
}

input.addEventListener('input', function() {
    if(globalRe.test(input.value)) {
        return remove();
    }
});

input.addEventListener('keyup', function(event) {
    if(event.key == 'Enter') {
        event.preventDefault();
        document.getElementById('enter').click();
    }
});