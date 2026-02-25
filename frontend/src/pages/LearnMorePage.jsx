import InfoLayout from "../layout/InfoLayout"

export default function LearnMorePage() {
  return (
    <InfoLayout title="Learn More">

      <p>
        Rahve supports one-to-one AI chat and collaborative group
        intelligence.
      </p>

      <p>
        Features include:
      </p>

      <ul className="list-disc pl-6 space-y-2">
        <li>Streaming AI responses</li>
        <li>Context-aware conversation memory</li>
        <li>Secure JWT authentication</li>
        <li>Dark mode support</li>
      </ul>

      <p>
        Future updates will include shared workspaces and AI-assisted
        summarization tools.
      </p>

    </InfoLayout>
  )
}