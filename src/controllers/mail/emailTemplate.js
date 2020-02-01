module.exports = ({ email, confirmationCode }) => {
    return `<h1>Bienvenido ${email} </h1>
      <h3>Ya solo queda un paso!!!</h3>
      <p>Para completar la subscripción tiene que clickar en el siguiente enlace</p>
        <a href="${process.env.URL_CONFIRM_NODEMAILER}/${confirmationCode}">Pulse aquí</a>

      <p>---</p>
      <h1>Welcome ${email} </h1>
      <h3>Common!! you are one step ahead!!!</h3>
      <p>Please, complete the subscription following link</p>
        <a href="http://localhost:3000/user/codeconfirmation/${confirmationCode}">Click Here</a>`;
};
