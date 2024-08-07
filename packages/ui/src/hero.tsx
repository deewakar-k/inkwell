import "./styles.css"

export const Hero = () => {
  return (
    <div className="w-full mt-48 ml-48 relative">
      <h1 className="text-9xl font-['cardinalfruit-med']">thoughts,</h1>
      <h1 className="text-9xl font-['cardinalfruit-med']">knowledge & vision</h1>
      <h5 className="text-2xl font-['cardinalfruit-it'] mt-8">your space to read, write, and discover new ideas</h5>
      <div className="absolute">
        <img className="w-96 h-64" src="https://www.stripe.press/images/pca/Talk11/03_header_C.jpg" alt="butterfly" />
      </div>
      <div className="absolute right-5">
        <img className="w-full h-64" src="https://www.stripe.press/images/pca/Talk11/56_relationships_of_affection_quote.jpg" alt="" />
      </div>
    </div>
  );
};
