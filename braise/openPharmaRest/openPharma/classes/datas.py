
from dataclasses import dataclass, field
from typing import List, Optional


@dataclass
class Pharmacy:
    name: str
    latitude: float = 0
    longitude: float = 0
    director: Optional[str] = None
    phones: List[str] = field(default_factory=list)
    addresses: List[str] = field(default_factory=list)
    zone: Optional[str] = None
    email: Optional[str] = None
    website: Optional[str] = None
    description: Optional[List[str]] = field(default_factory=list)
    images: Optional[List[str]] = field(default_factory=list)
    google_maps_link: Optional[str] = None


@dataclass
class PharmaConsultPharmacy(Pharmacy):
    """Representation of a pharmacy from the pharma-consults.net website
    """
    open_from: Optional[str] = None
    open_until: Optional[str] = None
