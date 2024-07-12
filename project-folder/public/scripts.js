document.addEventListener('DOMContentLoaded', function () {
  const justifyButtons = document.querySelectorAll('.btn.justify');

  justifyButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const justification = prompt(
        'Insira a justificativa ou solicitação de alteração:'
      );
      if (justification) {
        // Enviar a justificativa para o servidor
        fetch('/submit-justification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ justification }),
        })
          .then((response) => response.json())
          .then((data) => {
            alert(data.message);
            const requestId = data.requestId;

            // Simular resposta do ordenador de despesa
            setTimeout(() => {
              const approved = confirm(
                'O ordenador de despesa aprovou a justificativa. Deseja enviar para o responsável pelo cadastro?'
              );
              if (approved) {
                // Enviar aprovação para o servidor
                fetch('/approve-justification', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ requestId }),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    alert(data.message);
                  });
              } else {
                // Enviar rejeição para o servidor
                fetch('/reject-justification', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ requestId }),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    alert(data.message);
                  });
              }
            }, 2000);
          });
      }
    });
  });
});
