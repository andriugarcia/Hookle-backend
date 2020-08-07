import * as sgMail from '@sendgrid/mail'
import template from './templates/confirmation'
sgMail.setApiKey(
    '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'
)

const sendMail = async (email, token) => {
    const msg = {
        to: email,
        from: 'noreply@pickalook.co',
        subject: 'Verifica tu Email',
        text:
            'Haz click aquí para poder confirmar tu email y poder disfrutar de Pick a Look',
        html: template(token),
    }
    sgMail
        .send(msg)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.error(err)
        })
}

export default sendMail
