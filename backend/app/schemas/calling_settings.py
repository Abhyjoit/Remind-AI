from pydantic import BaseModel, ConfigDict


class CallingSettingsUpdate(BaseModel):
    calling_enabled: bool
    calling_hours: str


class CallingSettingsResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    calling_enabled: bool
    calling_hours: str
