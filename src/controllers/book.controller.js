
import Book from '../models/book.model'

async function getAllData(req, res) {
    try {
        const data = await Book.aggregate([
            {
                $match: {
                    launch: true
                }
            },
            {
                $lookup: {
                    from: 'Author',
                    localField: "author",
                    foregienField: "_id",
                    as: 'authorDetails'
                }
            },
            {
                $unwind: '$authorDetails' // Optional: unwinds the array if you want a flat structure
            }
        ])

        return res.status(200).json({
            message: 'Giving all data',
            data
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        })
    }
}