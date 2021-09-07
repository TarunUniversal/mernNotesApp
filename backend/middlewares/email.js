const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SEND_GRID)

const msg = {
    to: 'rathoretarun14@gmail.com',
    from: 'tarunrathore170899@gmail.com',
    subject: 'testing emailing',
    text: 'This is testing phase',
    html: '<h1>This is testing phase</h1>'
}

sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent');
    })
    .catch((error) => {
        console.log(error);
    })