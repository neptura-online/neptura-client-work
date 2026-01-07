interface WorkIcon {
  url: string;
  alt: string;
}

const WorkIcon = ({ url, alt }: WorkIcon) => {
  console.log(url);
  return <img src={`${url}`} alt={alt} className="h-11 w-11" />;
};

export default WorkIcon;
