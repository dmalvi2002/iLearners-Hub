import React from "react";
import { cardData, CardDataType } from "./cardData";
import EventCard from "./eventsCard";
import OfferCard from "./offersCard";
import NewsCard from "./newsCard";
import BranchCard from "./branchCard";

// Function to render the appropriate card based on category
const renderCard = (card: CardDataType) => {
  switch (card.category) {
    case "events":
      return <EventCard key={card.id} card={card} />;
    case "offers":
      return <OfferCard key={card.id} card={card} />;
    case "news":
      return <NewsCard key={card.id} card={card} />;
    case "branch":
      return <BranchCard key={card.id} card={card} />;
    default:
      return null;
  }
};

// Main Component
const NewsAndEvents: React.FC = () => {
  return (
    <div className="h-auto bg-transparent pt-20">
      {/* Header */}
      <div className="mb-16 text-center">
        <h2 className="mb-4 leading-tight bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-3xl font-bold text-transparent md:text-5xl drop-shadow-lg">
          Latest Updates
        </h2>
        <p className="mx-auto max-w-3xl text-lg text-indigo-700">
          Stay informed with our latest news, upcoming events, and exclusive
          offers
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="space-y-8">
          {cardData.map((card) => renderCard(card))}
        </div>
      </div>
    </div>
  );
};

export default NewsAndEvents;
