import SKAnimation from "./Animation";

export default function SkeletonParagraph({
  numberOfLines = 3,
}: {
  numberOfLines?: number;
}) {
  return (
    <div className="flex-1 space-y-6 py-1">
      <SKAnimation>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            {[...Array(numberOfLines)].map((item, index) => (
              <div
                key={index}
                className={`h-2 bg-slate-500 rounded ${
                  index == [...Array(numberOfLines)].length - 1
                    ? "col-span-1"
                    : "col-span-2"
                } `}
              ></div>
            ))}
          </div>
        </div>
      </SKAnimation>
    </div>
  );
}
