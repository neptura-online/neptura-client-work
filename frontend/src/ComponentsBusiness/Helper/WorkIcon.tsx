interface WorkIcon {
  url: string;
  alt: string;
}

const WorkIcon = ({ url, alt }: WorkIcon) => {
  return <img src={`${url}`} alt={alt} className="h-10 w-10" />;
};

export default WorkIcon;
