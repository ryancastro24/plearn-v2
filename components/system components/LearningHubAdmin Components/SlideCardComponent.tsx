const SlideCardComponent = ({ slide }: any) => {
  return (
    <div key={slide._id} className="bg-gray-100 rounded p-4">
      <h2>Category: {slide.category}</h2>
      <div className="mt-4">
        {slide.category === "explanation" ? (
          <p>{slide.discussion}</p>
        ) : (
          <div>
            <h3 className="text-sm">{slide.question}</h3>
            <div className="flex flex-col gap-2 mt-3">
              <span className="text-sm">
                <strong>Correct Answer:</strong> {slide.correct_answer}
              </span>
              {slide.option1 && (
                <span className="text-sm">
                  <strong>Option #1</strong> {slide.option1}
                </span>
              )}

              {slide.option2 && (
                <span className="text-sm">
                  <strong>Option #2</strong> {slide.option2}
                </span>
              )}

              {slide.option3 && (
                <span className="text-sm">
                  <strong>Option #3</strong> {slide.option3}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SlideCardComponent;
