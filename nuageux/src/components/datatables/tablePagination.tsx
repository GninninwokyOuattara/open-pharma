import { Button } from "@/components/ui/button"
import { ITablePagination } from "@/types/dataTypes"
import { BiFirstPage, BiLastPage } from "react-icons/bi"
import { GrFormNext, GrFormPrevious } from "react-icons/gr"


const TablePagination: React.FC<ITablePagination> = ({
    count,
    page,
    pageLength,
    setPageFn,
    next,
    previous,

}) => {

    const className = "bg-white text-appBlack hover:bg-appPrimary rounded-lg  p-1.5 border disabled:opacity-50"

    return (
        <div className="flex flex-col md:flex-row items-center gap-3 font-medium">
            <p>Page {page} <span className="text-appOrange">/</span> {Math.ceil(count / pageLength)} of  <span className="text-green-500">{count} results</span></p>

            <div className="flex flex-row items-center gap-3">
                <Button
                    id="firstPage"
                    className={className}
                    disabled={previous === null}
                    onClick={() => setPageFn(1)}
                >

                    <BiFirstPage
                        className="cursor-pointer"
                        size={25}



                    />
                </Button>
                <Button
                    id="previousPage"
                    className={className}
                    disabled={previous === null}
                    onClick={() => setPageFn(page - 1)}

                >

                    <GrFormPrevious
                        className="cursor-pointer"
                        size={25}

                    />
                </Button>
                <Button
                    id="nextPage"
                    className={className}
                    disabled={next === null}
                    onClick={() => setPageFn(page + 1)}

                >

                    <GrFormNext
                        className="cursor-pointer"
                        size={25}

                    />
                </Button>
                <Button
                    id="lastPage"
                    className={className}
                    disabled={next === null}
                    onClick={() => setPageFn(Math.ceil(count / pageLength))}

                >

                    <BiLastPage
                        className="cursor-pointer"
                        size={25}

                    />
                </Button>

            </div>

        </div>
    )
}




export default TablePagination