//Create a function to add and update journal entries
//Populated the preserve dropdown with useEffect since the info was already available
//Form is reset after submission

import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import type { JournalEntry } from "./types";
import type { SetJournalToEdit } from "./types";

//pass props for adding and editing, leaving out ID so that MockAPI creates ones
type Props = {
  onAdd: (newJournal: Omit<JournalEntry, "id">) => void;
  onEdit: (updatedJournal: JournalEntry) => void;
  journalToEdit: JournalEntry | undefined;
  setJournalToEdit: SetJournalToEdit;
};

function AddJournal({ onAdd, onEdit, journalToEdit, setJournalToEdit }: Props) {

    //Define form field state variables
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [date, setDate] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [content, setContent] = useState("");
    const [location, setLocation] = useState(""); //for the selected preserve
    const [preserveLocations, setPreserveLocations] = useState<string[]>([]); //for dropdown options
    const [isFeatured, setIsFeatured] = useState(false);
    
    //add a useEffect to fetch the location options
    useEffect(() => {
    fetch('https://681e7312c1c291fa66341abc.mockapi.io/API/Nature/locations') // Replace with your actual endpoint
      .then(res => res.json())
      .then(data => {
        const names = data.map((loc: { name: string }) => loc.name);
        setPreserveLocations(names);
      })
      .catch((err) => console.error("Error fetching locations:", err));
    }, []);

    //Use the same "add" form to allow edits to the current selection
    useEffect(() => {
        if (journalToEdit) {
          setTitle(journalToEdit.title);
          setAuthor(journalToEdit.author);
          setDate(journalToEdit.date);
          setImageUrl(journalToEdit.imageUrl);
          setContent(journalToEdit.content);
          setLocation(journalToEdit.location);     
        } else {
          setTitle("");
          setAuthor("");
          setDate("");
          setImageUrl("");
          setContent("");
          setLocation("");    
        }
    }, [journalToEdit]);

    //Edit the function for form submission to accepted new or updated
    function handleSubmit(event: React.FormEvent) {
      event.preventDefault();
      
      if (journalToEdit) {

        const updatedJournal = {
          ...journalToEdit,
          title,
          author,
          date,
          imageUrl,
          content,
          location
        };
        onEdit(updatedJournal);
        setJournalToEdit(undefined);
      } else {

      //Create new journal object when user submits the data
      const newJournal = {
        title,
        author,
        date,
        imageUrl,
        content,
        location,
        isFeatured
      };

      //Send the new journal object to the main app file
      onAdd(newJournal);
    }

    //Clear out the form fields after a submission
    setTitle("");
    setAuthor("");
    setDate("");
    setImageUrl("");
    setContent("");
    setLocation("");
    setIsFeatured(false);
    }

    return (
      <Card className="p-4">
        <Card.Title className="spicy-rice-regular">
          {journalToEdit ? "Update Journal Entry" : "Add a Journal Entry"}
        </Card.Title>   
      <form onSubmit={handleSubmit /*Process the new form submission*/}> 
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Journal Title</label>
            <input 
              id="title"
              type="text" 
              value={title}
              onChange={event => setTitle(event.target.value)}
              className="form-control"
              placeholder="Give your journal entry a title."
            />
          </div>
          <div className="mb-3">
            <label htmlFor="author" className="form-label">Name</label>
            <input
              id="author" 
              type="text" 
              value={author}
              onChange={event => setAuthor(event.target.value)}
              className="form-control"
              placeholder="You can share your name, screenname, or write 'anonymous'."
            />
          </div>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">Date Visited</label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={event => setDate(event.target.value)}
              className="form-control"
              placeholder="When did you visit the preserve?"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="url" className="form-label">URL to Image</label>
            <input
              id="url"
              type="text"
              value={imageUrl}
              onChange={event => setImageUrl(event.target.value)}
              className="form-control"
              placeholder="Link to an image that you took during your visit."
            />
          </div>    
          <div className="mb-3">
            <label htmlFor="content" className="form-label">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={event => setContent(event.target.value)}
              className="form-control"
              rows={12}
              placeholder="What was your experience at the preserve?"
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="type" className="form-label">Preserve Visited</label>
            <select
              id="location"
              value={location}
              onChange={event => setLocation(event.target.value)}
              className="form-control"
            >
              <option value="">Select a Location</option>
                {preserveLocations.map(name => (
                  <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            {journalToEdit && (
              <button
                type="button"
                className="btn btn-secondary w-100 mb-2"
                onClick={() => setJournalToEdit(undefined)}
              >
                Cancel Edit
              </button>
              )}
               <button type="submit" className="btn btn-secondary w-100">Submit</button>
          </div>
      </form>
      </Card>
    )
}

export default AddJournal;

