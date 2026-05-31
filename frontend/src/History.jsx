import {
  useEffect,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

function History() {

  // Store transcripts
  const [transcripts,
    setTranscripts] =
    useState([]);

  // Loading state
  const [loading,
    setLoading] =
    useState(true);

  // Error state
  const [error,
    setError] =
    useState("");

  // Fetch transcripts
  useEffect(() => {

    fetchHistory();

  }, []);

  // ------------------------
  // GET HISTORY
  // ------------------------

  const fetchHistory =
    async () => {

      try {

        const response =
          await fetch(
            "https://speech-to-text-app-e5va.onrender.com/history"
          );

        const data =
          await response.json();

        // If backend sends error
        if (data.error) {

          setError(data.error);

        } else {

          setTranscripts(data);
        }

      } catch (err) {

        console.log(err);

        setError(
          "Failed to load history"
        );

      } finally {

        setLoading(false);
      }
    };

  // ------------------------
  // UI
  // ------------------------

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >

      {/* Heading */}

      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "40px"
        }}
      >

        Transcript History

      </h1>

      {/* Back Button */}

      <div
        style={{
          textAlign: "center",
          marginBottom: "30px"
        }}
      >

        <Link
          to="/"
          style={{
            color: "#38bdf8",
            textDecoration: "none",
            fontSize: "18px"
          }}
        >

          ← Back To Home

        </Link>

      </div>

      {/* Loading */}

      {loading && (

        <p
          style={{
            textAlign: "center"
          }}
        >

          Loading transcripts...

        </p>
      )}

      {/* Error */}

      {error && (

        <p
          style={{
            textAlign: "center",
            color: "#ef4444"
          }}
        >

          {error}

        </p>
      )}

      {/* Empty */}

      {
        !loading &&
        transcripts.length === 0 && (

          <p
            style={{
              textAlign: "center",
              color: "#94a3b8"
            }}
          >

            No transcripts found

          </p>
        )
      }

      {/* Transcript Cards */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          maxWidth: "900px",
          margin: "0 auto"
        }}
      >

        {
          transcripts.map(
            (item, index) => (

              <div
                key={index}
                style={{
                  background: "#1e293b",
                  padding: "25px",
                  borderRadius: "12px",
                  boxShadow:
                    "0 0 10px rgba(0,0,0,0.3)"
                }}
              >

                {/* Transcript */}

                <p
                  style={{
                    lineHeight: "1.8",
                    marginBottom: "20px",
                    fontSize: "17px"
                  }}
                >

                  {item.text}

                </p>

                {/* Details */}

                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    flexWrap: "wrap",
                    gap: "10px",
                    color: "#94a3b8",
                    fontSize: "14px"
                  }}
                >

                  <span>

                    File:
                    {" "}
                    {item.filename}

                  </span>

                  <span>

                    Duration:
                    {" "}
                    {item.duration_seconds}s

                  </span>

                  <span>

                    Language:
                    {" "}
                    {item.language}

                  </span>

                </div>

              </div>
            )
          )
        }

      </div>

    </div>
  );
}

export default History;