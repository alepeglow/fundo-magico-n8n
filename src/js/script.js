document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form');
    const btn = document.querySelector('.btn');
    const htmlCode = document.querySelector('.html-code');
    const cssCode = document.querySelector('.css-code');
    const preview = document.querySelector('.preview-area');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const description = document.getElementById('description').value;

        setLoading(true);
        
        try {
           const response = await fetch('https://background-214e.up.railway.app/webhook-test/background', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ description }),
            });
                const data = await response.json()
            
            htmlCode.textContent = data.code;
            cssCode.textContent = data.style;

            preview.style.display = 'block';
            preview.innerHTML = data.code;

            let styleTag = document.getElementById('dynamic-style');
            if(styleTag) styleTag.remove();
            if(data.style) {
                styleTag = document.createElement('style');
                styleTag.id = 'dynamic-style';
                styleTag.textContent = data.style;
                document.head.appendChild(styleTag);
            }
        } catch (error) {
            console.error('Erro:', error);
        }finally {
            setLoading(false);
        }
       

});

function setLoading(isLoading) {
   btn.innerHTML = isLoading ? 'Gerando Background...' : 'Gerar Background'; 
}


});