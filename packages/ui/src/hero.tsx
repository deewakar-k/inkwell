import { Button } from "./button";
import "./styles.css"

export const Hero = () => {
  return (
    <div className="w-full px-52 py-40">
      <div className="relative">
        <h1 className="text-9xl font-['cardinalfruit-med']">thoughts,</h1>
        <h1 className="text-9xl font-['cardinalfruit-med']">knowledge & vision</h1>
        <h5 className="text-2xl font-['cardinalfruit-it'] mt-8">your space to read, write, and discover new ideas</h5>
      </div>
      <div className="absolute top-[320px] right-[300px] transform rotate-6 z-10">
        <img className="w-96 h-64" src="https://www.stripe.press/images/pca/Talk11/03_header_C.jpg" alt="butterfly" />
      </div>
      <div className="absolute top-[130px] right-[600px] transform -rotate-6">
        <img className="w-full h-64" src="https://www.stripe.press/images/pca/Talk11/56_relationships_of_affection_quote.jpg" alt="flowers" />
      </div>
      <div className="flex justify-center mt-52 font-['cardinalfruit-med'] text-xl">
        <Button label={"start reading"} />
      </div>
    </div>
  );
};
