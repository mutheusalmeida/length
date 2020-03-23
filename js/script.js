const numbers = document.getElementById('numbers');
const errorMsg = document.getElementById('errorMsg');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const globalRe = /^((\d*\.)?\d+|(\d*\s*?\,\s*)?\d+|(\d*\,)?\d+)+$/igm;

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('service-worker.js');
    });
}

numbers.addEventListener('keyup', function(event) {
    if(event.key == 'Enter') {
        event.preventDefault();
        document.getElementById('enter').click();
    }
});

function validate() {
    if(numbers.value == '') {
        errorMsg.innerHTML = `I can't calculate without a number.`;
        errorMsg.classList.add('app__error-msg--show');
        numbers.style.borderColor = '#e03227';
        numbers.focus();
        return false;
    }

    const localRe = /^((\d*\.)?\d+|(\d*\s*?\,\s*)?\d+|(\d*\,)?\d+)+$/igm;

    if(!localRe.test(numbers.value)) {
        errorMsg.innerHTML = `Hmm, try to follow the format.`;
        errorMsg.classList.add('app__error-msg--show');
        numbers.style.borderColor = '#e03227';
        numbers.focus();
        return false;
    }
    
    function calc() {
        modal.showModal();

        const serie = numbers.value.split(',');

        const sum = serie.reduce((a, b) => a + Number(b), 0);
        
        const mean = sum / serie.length;
        
        document.getElementById('mean').innerHTML = `Your mean is <b class="result">${mean.toFixed(1)}</b>!`;
    }

    calc(remove());
}

function remove() {
    errorMsg.classList.remove('app__error-msg--show');
    numbers.removeAttribute('style');
}

numbers.addEventListener('input', function() {
    if(globalRe.test(numbers.value)) {
        return remove();
    }
});

closeModal.addEventListener('click', function() {
    modal.close();
    numbers.value = '';
});