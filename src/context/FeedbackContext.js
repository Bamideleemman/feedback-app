import {v4 as uuidv4} from 'uuid'
import {createContext, useState, useEffect} from 'react'

const FeebackContext = createContext()

export const FeedbackProvider = ({children}) => {

    const [feedback, setFeedback] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

useEffect(() => {fetchFeedback()}, [console.log(123)])

// Fetch feedback from backend
 const fetchFeedback = async () => {
    const response = await fetch("/feedback?_sort=id&_order=desc")
    const data = await response.json()

    setFeedback(data);
    setIsLoading(false)
 }

// Add feedback
const addFeedback = async (newFeedback) => {
    const response = await fetch('/feedback', {
        method:'POST', 
        headers: {
        'Content-Type': 'application/json'
    }, body: JSON.stringify(newFeedback),
})
const data = await response.json()

    setFeedback([data,...feedback])

}

// Delete feedback
const deleteFeedback = async (id) => {
    if(window.confirm('Are you sure you want to delete?')) {
        await fetch(`/feedback/${id}`, {method: 'DELETE'})
    setFeedback(feedback.filter((item) => item.id !==id))}
}

//Update the feedback item

const updateFeedback = async (id, updItem) => {
    const response = await fetch(`/feedback/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updItem)
    })

    const data = await response.json()
    setFeedback(feedback.map((item) => (item.id ===id ? {...item, ...data} :item)))
}
// set item to be updated
const editFeedback = (item) => {
    setFeedbackEdit({
        item,
        edit: true
    })
}

    return <FeebackContext.Provider value={{
        feedback,
        deleteFeedback, 
        isLoading,
        addFeedback, 
        editFeedback,
        feedbackEdit,
        updateFeedback
    }}>
        {children}
    </FeebackContext.Provider>
}

export default FeebackContext