import Image from "next/image";
import {
  BsExclamationCircle,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

const EditorJsonComponents = ({ jsonData }: { jsonData: any }) => {
  return (
    <div>
      {jsonData?.blocks?.map((block: any, index: number) => {
        switch (block.type) {
          case "paragraph":
            return (
              <div
                className="pb-3  text-sm font-medium text-gray-800 font-space "
                dangerouslySetInnerHTML={{
                  __html: `${block.data.text}`,
                }}
              ></div>
            );
          case "Header":
            let fontSize = 30;
            let color = "#FB8B2A";
            switch (block.data.level) {
              case 1:
                fontSize = 40;
                color = "#fff";
                break;
              case 2:
                fontSize = 26;
                color = "#16a7b5";
                break;
              case 3:
                fontSize = 24;
                color = "#83C7FF";
                break;
              case 4:
                fontSize = 20;
                color = "#B7E3E4";
                break;
              case 5:
                fontSize = 18;
                color = "#abad7e";
                break;
              default:
                fontSize = 20;
                color = "#98633c";
                break;
            }
            return (
              <p
                key={index}
                style={{ fontSize: fontSize, color: color }}
                className=" mt-4 mb-8 text-xs  "
              >
                {block.data.text}
              </p>
            );
          case "Image":
            return (
              <div key={index} className="mb-4 mt-2">
                <Image
                  alt="ok"
                  src={block.data.file.url}
                  className={`w-full  mt-4 rounded-md shadow-md ${
                    !block.data.withBorder && "border-2 border-black p-2"
                  }`}
                  height={50}
                  width={600}
                />
                {block.data.caption && (
                  <p className="italic text-center text-slate-400 text-lg mb-5 mt-1">
                    {block.data.caption}
                  </p>
                )}
              </div>
            );
          case "List":
            return (
              <ul
                key={index}
                className={`w-full text-sm ml-3 pl-4 mt-2   ${
                  block.data.style == "ordered"
                    ? "list-decimal"
                    : block.data.style == "unordered"
                    ? "list-disc"
                    : "list-none"
                }`}
              >
                {block.data.items.map((item: any, itemIndex: number) => (
                  <li key={itemIndex} className="w-full   ">
                    <p className="pb-3  text-sm font-medium text-gray-800 font-space ">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            );
          case "Checklist":
            return (
              <div key={index} className="w-full  mt-10 mb-5  ">
                {block.data.items.map((item: any, itemIndex: number) => (
                  <div
                    key={itemIndex}
                    className="w-full  px-3 flex flex-wrap justify-between mb-1"
                  >
                    <p className="w-[5%]">{item.checked ? "✔️" : "❌"}</p>
                    <p className="w-[95%] pl-3 text-base">{item.text}</p>
                  </div>
                ))}
              </div>
            );
          case "Quote":
            return (
              <div
                key={index}
                className="p-8 bg-footer bg-cover bg-no-repeat rounded-lg flex flex-col flex-wrap justify-start items-start "
              >
                <p className="pb-3  text-lg font-light text-gray-300 font-space ">
                  &quot;{block.data.text}&quot;
                </p>
                <div className="flex flex-wrap justify-center items-center">
                  {/* <span className="hidden lg:block border-t-2 mt-0.5  border-white w-10  ">
                    {" "}
                  </span> */}
                  <p className="   text-base font-light text-gray-300 font-space  ">
                    {block.data.caption}
                  </p>
                  {/* <span className="hidden lg:block border-t-2 mt-0.5  border-white w-10  ">
                    {" "}
                  </span> */}
                </div>
              </div>
            );
          case "Warning":
            return (
              <div
                key={index}
                className=" bg-[#e9cf89]    px-4 py-5  my-10 rounded-lg shadow"
              >
                <div className="mx-2 flex flex-row justify-between">
                  <p className="text-blue-gray-900  font-bold text-space tracking-wide  text-lg   w-[95%]">
                    {block.data.title}
                  </p>
                  <BsExclamationCircle className="h-10 w-10 text-colorOne" />
                </div>
                <p className="  pt-1 pl-2  text-lg font-light text-blue-gray-900 font-space ">
                  {block.data.message}
                </p>
              </div>
            );
          case "Delimiter":
            return (
              <div
                key={index}
                className="mt-2 mb-5 border-b-2 border-[#575757]  hover:border-colorTwo py-5"
              ></div>
            );
          case "Link":
            return (
              <div className="  bg-popup bg-cover bg-center bg-no-repeat  rounded-lg">
                <div className="py-4 px-4 my-10 flex justify-start items-start">
                  <a
                    className="font-space text-lg text-colorTwo hover:text-colorOne font-light py-4 px-10  bg-[#0f0f0f] hover:bg-[#080808] shadow-md rounded-md flex space-x-3 capitalize  "
                    target="_blank"
                    href={block.data.link}
                  >
                    <span>Voir tout,</span>
                    <BsFillArrowRightCircleFill className="h-5 w-5" />
                  </a>
                </div>
              </div>
            );
          case "Table":
            return (
              <div key={index}>
                <div className="relative overflow-x-auto  bg-ctaBack bg-cover bg-center bg-no-repeat  mb-12 mt-5 ">
                  <table className="w-full text-sm text-left     ">
                    <thead className="    w-full    ">
                      <tr style={{ flexDirection: "row" }}>
                        {block.data.content[0].map(
                          (cell: any, cellIndex: number) => (
                            <td
                              key={cellIndex}
                              style={{
                                borderWidth: 1,
                                width: 150,
                                padding: 10,
                                backgroundColor: "#090908",
                                borderBottomWidth: 0,
                                borderColor: "#6e6e6e",
                              }}
                            >
                              <p className="text-base text-white font-bold tracking-wider px-2 py-1">
                                {cell}
                              </p>
                            </td>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {block.data.content
                        .slice(1)
                        .map((row: any, rowIndex: number) => (
                          <tr key={rowIndex} style={{ flexDirection: "row" }}>
                            {row.map((cell: any, cellIndex: number) => (
                              <td
                                key={cellIndex}
                                style={{
                                  borderWidth: 1,
                                  width: 150,
                                  padding: 5,
                                  borderColor: "#6e6e6e",

                                  backgroundColor:
                                    rowIndex % 2 === 0 ? "#1a1a19" : "#292927",
                                  borderBottomWidth:
                                    block.data.content.slice(1).length - 1 ==
                                    rowIndex
                                      ? 0.9
                                      : 0,
                                }}
                              >
                                <p className="text-base text-white   tracking-wider px-2 py-1">
                                  {cell}
                                </p>
                              </td>
                            ))}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          case "Raw":
            return (
              <div
                key={index}
                className="p-0 md:p-8 bg-ctaBack bg-cover bg-center bg-no-repeat rounded-lg flex flex-col flex-wrap justify-center items-center my-10"
              >
                {/* You may need to parse the HTML and render it as React Native components */}

                <p className="text-gray-300">{block.data.html}</p>
              </div>
            );
          case "Attaches":
            return (
              <div key={index}>
                material-tailwind/react
                {block.data.file.extension == "jpeg" &&
                "png" &&
                "jpg" &&
                "gif" ? (
                  <div className="mb-5 mt-5">
                    <Image
                      alt="ok"
                      src={block.data.file.url}
                      className={`w-[100%] lg:w-[50%]  mt-4 rounded-md shadow-md ${
                        !block.data.withBorder && "border-2 border-black p-2"
                      }`}
                      height={50}
                      width={400}
                    />
                  </div>
                ) : (
                  <>
                    <div className="  bg-popup bg-cover bg-center bg-no-repeat  rounded-lg">
                      <div className="py-4 px-4 my-10 flex justify-start items-start">
                        <a
                          className="font-space text-lg text-colorTwo hover:text-colorOne font-light py-4 px-10  bg-[#0f0f0f] hover:bg-[#080808] shadow-md rounded-md flex space-x-3 capitalize  "
                          href={block.data.file.url}
                        >
                          <span> {block.data.file.name} </span>
                          <BsFillArrowRightCircleFill className="h-5 w-5" />
                        </a>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default EditorJsonComponents;
