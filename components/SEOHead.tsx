interface SEOHeadProps {
  structuredData?: any
}

export default function SEOHead({ structuredData }: SEOHeadProps) {
  return (
    <>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={structuredData}
        />
      )}
    </>
  )
}