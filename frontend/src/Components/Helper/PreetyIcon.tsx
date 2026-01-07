interface WorkIcon {
  url: string;
  alt: string;
}

const WorkIcon = ({ url, alt }: WorkIcon) => {
  console.log(url);
  return <img src={`${url}`} alt={alt} className="h-8 w-8 " />;
};

export default WorkIcon;
