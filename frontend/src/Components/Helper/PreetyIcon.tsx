interface WorkIcon {
  url: string;
  alt: string;
}

const PreetyIcon = ({ url, alt }: WorkIcon) => {
  return <img src={`${url}`} alt={alt} className="h-8 w-8 brightness-0 " />;
};

export default PreetyIcon;
