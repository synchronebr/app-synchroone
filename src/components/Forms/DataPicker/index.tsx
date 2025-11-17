// components/DatePicker/index.tsx
import React, { useMemo, useState } from "react";
import { Modal, Pressable } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { format } from "date-fns";
import { ptBR, enUS, es } from "date-fns/locale";
import { Calendar1Icon } from "lucide-react-native";
import {
  Wrapper,
  Label,
  Button,
  Left,
  CalendarIcon,
  BtnText,
  Clear,
  ClearText,
  ErrorText,
  Backdrop,
  Sheet,
  SheetHeader,
  SheetTitle,
  Actions,
  Ghost,
  GhostText,
  Primary,
  PrimaryText
} from "./styles";
import { useAuth } from "../../../hooks/useAuth";
import THEME from "../../../global/styles/theme";
import { t } from "i18next";

const dfLocale = (l?: string) => (l === "pt-BR" ? ptBR : l === "es-ES" ? es : enUS);

// Locale Calendário
LocaleConfig.locales['pt-br'] = {
    monthNames: [
        t('index.monthJanuary'),
        t('index.monthFebruary'),
        t('index.monthMarch'),
        t('index.monthApril'),
        t('index.monthMay'),
        t('index.monthJune'),
        t('index.monthJuly'),
        t('index.monthAugust'),
        t('index.monthSeptember'),
        t('index.monthOctober'),
        t('index.monthNovember'),
        t('index.monthDecember'),
    ],
    monthNamesShort: [
        t('index.janShort'),
        t('index.febShort'),
        t('index.marShort'),
        t('index.aprShort'),
        t('index.mayShort'),
        t('index.junShort'),
        t('index.julShort'),
        t('index.augShort'),
        t('index.sepShort'),
        t('index.octShort'),
        t('index.novShort'),
        t('index.decShort'),
    ],
    // Ordem esperada: Domingo → Sábado
    dayNames: [
        t('index.sunday'),
        t('index.monday'),
        t('index.tuesday'),
        t('index.wednesday'),
        t('index.thursday'),
        t('index.friday'),
        t('index.saturday'),
    ],
    dayNamesShort: [
        t('index.sun'),
        t('index.mon'),
        t('index.tue'),
        t('index.wed'),
        t('index.thu'),
        t('index.fri'),
        t('index.sat'),
    ],
    today: t('index.today'),
};

type Props = {
  value?: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  displayFormat?: string;
  error?: string;
  label?: string;
};

export function DatePicker({
  value,
  onChange,
  placeholder = t('index.selectDate'),
  disabled,
  minDate,
  maxDate,
  displayFormat = "dd/MM/yyyy",
  error,
  label,
}: Props) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [temp, setTemp] = useState<Date | null>(value ?? null);

  const toStr = (d: Date) => d.toISOString().slice(0, 10);

  const marked = useMemo(() => {
    if (!temp) return {};
    const k = toStr(temp);
    return { [k]: { selected: true } };
  }, [temp]);

  LocaleConfig.defaultLocale = user?.locale === "pt-BR" ? "pt-br" : "pt-br";

  const minStr = minDate ? toStr(minDate) : undefined;
  const maxStr = maxDate ? toStr(maxDate) : undefined;

  const handleConfirm = () => {
     onChange(temp ?? null);
     setOpen(false);
  };

  const handleDayPress = (day: any) => {
    const [y, m, d] = day.dateString.split("-").map(Number);
    setTemp(new Date(y, (m ?? 1) - 1, d));
  };

  const handleClear = () => setTemp(null);
  const handleToday = () => setTemp(new Date());

  const localeFormat = dfLocale(user?.locale);

  const labelText = value
    ? format(value, displayFormat, { locale: localeFormat })
    : placeholder;

  return (
    <Wrapper>
      {!!label && <Label>{label}</Label>}

      <Button disabled={disabled} hasError={!!error} onPress={() => !disabled && setOpen(true)}>
        <Left>
          <CalendarIcon>
            <Calendar1Icon size={20} color={disabled ? THEME.colors.gray : THEME.colors.primary}/>
          </CalendarIcon>
          <BtnText $placeholder={!value} disabled={disabled}>{labelText}</BtnText>
        </Left>

        {!!value && !disabled && (
          <Clear onPress={() => onChange(null)}>
            <ClearText>×</ClearText>
          </Clear>
        )}
      </Button>

      {!!error && <ErrorText>{error}</ErrorText>}

      <Modal animationType="fade" transparent visible={open} onRequestClose={() => setOpen(false)}>
        <Backdrop as={Pressable} onPress={() => setOpen(false)} />

        <Sheet>
          <SheetHeader>
            <SheetTitle>{t('index.selectDate')}</SheetTitle>
          </SheetHeader>

          <Calendar
            onDayPress={handleDayPress}
            markedDates={marked}
            minDate={minStr}
            maxDate={maxStr}
            theme={{
                selectedDayBackgroundColor: THEME.colors.primary,
                arrowColor: THEME.colors.primary,
                selectedDayTextColor: THEME.colors.primary_light,
            }}
          />

          <Actions>
            <Ghost onPress={handleToday}><GhostText>{t('index.today')}</GhostText></Ghost>
            <Ghost onPress={handleClear}><GhostText>{t('index.clear')}</GhostText></Ghost>
            <Primary onPress={handleConfirm}><PrimaryText>{t('index.confirm')}</PrimaryText></Primary>
          </Actions>
        </Sheet>
      </Modal>
    </Wrapper>
  );
}
