import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import { IconButton } from '@mui/material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import '../../styleSheets/FooterStyles.css'
import { useTheme } from '@mui/material';
import Divider from '@mui/material/Divider';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import LocationOnIcon from '@mui/icons-material/LocationOn';


const FooterComponent = () => {
    const theme = useTheme();

    return (
        <footer style={{
            color: theme.palette.footer.text,
        }}>
            <Grid container className="footer_container" style={{ backgroundColor: theme.palette.footer.background, marginTop: 'auto' }}>
                <Grid item xs={12} md={4} p={2}>
                    <div>
                        <Typography variant='h5' gutterBottom sx={{ textDecoration: 'underline' }}>
                            WeatherWise
                        </Typography>
                        <Typography variant="caption" display="block" gutterBottom>
                            WeatherWise is a responsive web application designed to provide up-to-date weather information for any location. This app serves as a portfolio project and is not intended for commercial use.
                        </Typography>
                        <Link href="https://github.com/ospac345/WeatherApp" target="_blank" rel="noopener noreferrer">Github Repository</Link>
                    </div>
                    <Divider />
                    <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                        Important Notice:
                    </Typography>
                    <Typography variant='caption' display="block" gutterBottom>
                        WeatherWise does not store any data on its servers. When you search for a location or city, the app only uses this information to source weather data, and it is temporarily stored in your local storage for a seamless user experience. Rest assured, your data privacy is a top priority.
                    </Typography>
                    <Divider />
                    <Grid item sx={{ marginTop: '10px' }}>
                        <LocationOnIcon /> Glasgow, United Kingdom
                    </Grid>
                </Grid>
                <Grid item className="social_media" xs={12} md={4} p={2}>
                    <Grid item>
                        <Typography variant='h5' gutterBottom sx={{ textDecoration: 'underline' }}>Attributions</Typography>
                        <Typography variant='body2'>
                            Weather and Air Quality Data by <Link href="https://open-meteo.com" target="_blank" rel="noopener noreferrer">Open-Meteo</Link>.
                        </Typography>
                        <Typography variant='body2'>
                            City Search provided by <Link href="https://geojson.org/" target="_blank" rel="noopener noreferrer">GeoJson</Link>
                        </Typography>
                        <Typography variant='body2'>
                            The Weather Icons are provided by <Link href="https://openweathermap.org/weathermap" target="_blank" rel="noopener noreferrer">OpenWeatherMap</Link> and sourced from <Link href='https://gist.github.com/stellasphere/9490c195ed2b53c707087c8c2db4ec0c' target='_blank'>stellasphere</Link> repository.
                        </Typography>
                        <Typography variant='body2'>
                            Built with <Link href='https://react.dev' target="_blank">React JS</Link>, <Link href="https://mui.com/" target="_blank" rel="noopener noreferrer">Material-UI</Link>, <Link href="https://react-redux.js.org/" target="_blank" rel="noopener noreferrer">Redux</Link>, and <Link href="https://www.chartjs.org/" target="_blank" rel="noopener noreferrer">Chart.js</Link>.
                        </Typography>
                    </Grid>

                    <Divider />
                    <Grid item sx={{ display: 'flex' }}>
                        <div>
                            <Link href="mailto:i.syed.faisal@hotmail.com" target="_blank" rel="noopener noreferrer">
                                <IconButton aria-label="email"><AlternateEmailIcon /></IconButton>
                            </Link>
                        </div>
                        <div>
                            <Link href="https://www.linkedin.com/in/syed-faisal-imam-gcu/" target="_blank" rel="noopener noreferrer">
                                <IconButton aria-label="linkedin"><LinkedInIcon /></IconButton>
                            </Link>
                        </div>
                        <div>
                            <Link href="https://www.facebook.com/ospac345" target="_blank" rel="noopener noreferrer">
                                <IconButton aria-label="facebook"><FacebookIcon /></IconButton>
                            </Link>
                        </div>
                        <div>
                            <Link href="https://github.com/ospac345" target="_blank" rel="noopener noreferrer">
                                <IconButton aria-label="github"><GitHubIcon /></IconButton>
                            </Link>
                        </div>

                        <div>
                            <Link href="https://wa.me/447480976762" target="_blank" rel="noopener noreferrer">
                                <IconButton aria-label="whatsapp"><WhatsAppIcon /></IconButton>
                            </Link>
                        </div>

                    </Grid>
                    <Divider />
                    <Grid item>
                        <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                            Legal Disclaimer:
                        </Typography>
                        <Typography variant='caption' gutterBottom>
                            WeatherWise is a personal project for showcasing skills and knowledge in web development. It is not meant for commercial purposes or real-world weather forecasting. All weather data displayed in this app is for demonstration purposes only and may not be entirely accurate or up-to-date.
                        </Typography>
                    </Grid>
                </Grid>

            </Grid>
            <Grid>
                <Typography variant='body2' sx={{ textAlign: 'center' }} gutterBottom>
                    © 2023 Syed Faisal Imam | This code is open for reuse. Contact me at my email for permission.
                </Typography>
            </Grid>
        </footer >
    )
}

export default FooterComponent;