import { Button } from "@/components/ui/button"
import { ITablePagination } from "@/types/datatypes"
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
        <div className="flex flex-row items-center gap-3">
            <p>Displaying page {page} of {Math.ceil(count / pageLength)}</p>

            <Button
                id="firstPage"
                className={className}
                disabled={previous === null}
            >

                <BiFirstPage
                    className="cursor-pointer"
                    size={25}
                    onClick={() => setPageFn(1)}


                />
            </Button>
            <Button
                id="previousPage"
                className={className}
                disabled={previous === null}
            >

                <GrFormPrevious
                    className="cursor-pointer"
                    size={25}
                    onClick={() => setPageFn(page - 1)}

                />
            </Button>
            <Button
                id="nextPage"
                className={className}
                disabled={next === null}
            >

                <GrFormNext
                    className="cursor-pointer"
                    size={25}
                    onClick={() => setPageFn(page + 1)}

                />
            </Button>
            <Button
                id="lastPage"
                className={className}
                disabled={next === null}
            >

                <BiLastPage
                    className="cursor-pointer"
                    size={25}
                    onClick={() => setPageFn(Math.ceil(count / pageLength))}

                />
            </Button>

        </div>
    )
}




export default TablePagination