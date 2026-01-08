interface PreetyIcon {
  url: string;
  alt: string;
}

const PreetyIcon = ({ url, alt }: PreetyIcon) => {
  return <img src={`${url}`} alt={alt} className="h-8 w-8 lg:h-10 lg:w-10" />;
};

export default PreetyIcon;
