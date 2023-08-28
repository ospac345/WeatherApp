import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import { IconButton } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import '../../styleSheets/FooterStyles.css'


const FooterComponent = () => {

    return (
        <footer>
            <div class="footer_container">
                <p>Syed Faisal Imam </p>
                <div class="social_media">
                    <IconButton aria-label="linkedin"><LinkedInIcon /></IconButton>
                    <IconButton aria-label="facebook"><FacebookIcon /></IconButton>
                    <IconButton aria-label="github"><GitHubIcon /></IconButton>
                    <IconButton aria-label="whatsapp"><WhatsAppIcon /></IconButton>

                </div>
                <p>Syed Faisal Imam © 2020 All Rights Reserved.</p>
            </div>
        </footer >
    )
}

export default FooterComponent;