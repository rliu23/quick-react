interface BannerProps {
    title: string;
}
const Banner = ({title}: BannerProps) => (
    <header>
        <h1>{title}</h1>
    </header>
);

export default Banner;