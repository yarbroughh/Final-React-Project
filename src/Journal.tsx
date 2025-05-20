//This component uses full CRUD logic, tied to MockAPI
//
import { useEffect, useState } from "react";
import { useRef } from "react"; //Learned to bring content block down with 'active' entry

import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Layout from "./Layout";
import AddJournal from "./AddJournalEntry";
import type { JournalEntry } from "./types";

function Journal() {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [activeJournal, setActiveJournal] = useState<JournalEntry | null>(null);
  const [journalToEdit, setJournalToEdit] = useState<JournalEntry | undefined>();

  //add ref to right column for auto-scroll and use scrollIntoView by the buttons
  const detailRef = useRef<HTMLDivElement>(null); 

  // Fetch journal entries from MockAPI
  useEffect(() => {
    fetch("https://681e7312c1c291fa66341abc.mockapi.io/API/Nature/journal") 
      .then(res => res.json())
      .then(data => setJournalEntries(data))
      .catch(err => console.error("Error fetching journal entries:", err));
  }, []);

  const [loading, setLoading] = useState(true);

  //Add a loading state
    useEffect(() => {
    fetch("...")
        .then(res => res.json())
        .then(data => {
        setJournalEntries(data);
        setLoading(false);
        })
        .catch(err => {
        console.error("Error fetching journal entries:", err);
        setLoading(false);
        });
    }, []);

  // Adds a new entry to MockAPI database
  const handleAdd = (newEntry: Omit<JournalEntry, "id">) => {
    fetch("https://681e7312c1c291fa66341abc.mockapi.io/API/Nature/journal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEntry),
    })
      .then(res => res.json())
      .then(added => setJournalEntries([...journalEntries, added]));
  };

  // Fetches the active journal entry from MockAPI by id, allows an update, and returns
  const handleEdit = (updated: JournalEntry) => {
    fetch(`https://681e7312c1c291fa66341abc.mockapi.io/API/Nature/journal/${updated.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    })
      .then(res => res.json())
      .then(saved => {
        setJournalEntries(journalEntries.map(j => j.id === saved.id ? saved : j));
        setJournalToEdit(undefined);
        setActiveJournal(null);
      });
  };

  //Handle delete (deletes from MockAPI, removes from state, clears the active journal)
  const handleDelete = (id: string) => {
  fetch(`https://681e7312c1c291fa66341abc.mockapi.io/API/Nature/journal/${id}`, {
    method: "DELETE",
  })
    .then(() => {
      setJournalEntries(journalEntries.filter(entry => entry.id !== id));
      if (activeJournal?.id === id) setActiveJournal(null);
      if (journalToEdit?.id === id) setJournalToEdit(undefined);
    })
    .catch(err => console.error("Error deleting entry:", err));
};

  return (
    <Layout heroTitle="Journal" heroImage="/images/hero-journal.jpg">
      <section className="section-background py-5">
        <Container>
          <h2 className="mb-4 text-center">Recent Stories from Our Community</h2>
          <Row>
            {/* Left column - bootstrap cards to house journal entries */}
            <Col md={6}>
              {loading ? <p>Loading journal entries...</p> : ( //Message for slow load
                journalEntries.map(entry => ( //Map through all entries in MockAPI
                <Card className="mb-4" key={entry.id}>
                  <Card.Img 
                    variant="top" 
                    src={entry.imageUrl} 
                    style={{ height: "150px", objectFit: "cover" }} 
                  />
                  <Card.Body>
                    <Card.Title>{entry.title}</Card.Title>
                    <hr className="mt-2" />
                    <Card.Subtitle>{entry.location}</Card.Subtitle>
                    <Card.Text style={{ overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                      {entry.content}
                    </Card.Text>
                    <Button className="btn btn-secondary me-2" onClick={() => {
                      setActiveJournal(entry);
                      setJournalToEdit(undefined);//clear the edit state
                      setTimeout(() => detailRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
                    }}>
                      Read More
                    </Button>
                    <Button className="btn btn-secondary me-2" onClick={() => {
                      setJournalToEdit(entry);
                      setActiveJournal (null);
                      setTimeout(() => detailRef.current?.scrollIntoView({ behavior: 'smooth'}), 100);
                    }}>
                      Edit
                    </Button>
                    <Button 
                        className="btn btn-secondary "
                        onClick={() => handleDelete(entry.id)}
                    >
                        Delete
                    </Button>
                  </Card.Body>
                </Card>
              ))
            )}
            </Col>

            {/* Right column - a form that will be used to add, edit, or update an entry 
            as well as a block to display the "current" chosen entry*/}
            <Col md={6}>
              <div ref={detailRef}> {/*wrap column content with ref to auto-scroll*/}
                {activeJournal && !journalToEdit && ( //close when user wants to edit
                  <Card className="mb-4">
                    <Card.Img variant="top" src={activeJournal.imageUrl} />
                    <Card.Body>
                      <Card.Title>{activeJournal.title}</Card.Title>
                      <p className="mb-1"><strong>By:</strong> {activeJournal.author}</p>
                      <p className="mb-3"><strong>Date:</strong> {activeJournal.date}</p>
                      <Card.Text>{activeJournal.content}</Card.Text>
                      <Button variant="secondary" size="sm" onClick={() => setActiveJournal(null)}>
                        Close
                      </Button>
                    </Card.Body>
                  </Card>
                )}
                <AddJournal
                  onAdd={handleAdd}
                  onEdit={handleEdit}
                  journalToEdit={journalToEdit}
                  setJournalToEdit={setJournalToEdit}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  );
}

export default Journal;
