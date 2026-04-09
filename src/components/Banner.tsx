interface BannerProps {
    title: string;
}
const Banner = ({title}: BannerProps) => (
    <header>
        <h1 className="text-2xl">{title}</h1>
    </header>
);

export default Banner;