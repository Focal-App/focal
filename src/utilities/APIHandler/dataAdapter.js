import { formatDate } from "utilities/date";
import { convertPenniesToDollars, convertDollarsToPennies } from "utilities/price";

export const DefaultText = {
    noContent: "-",
    nothing: ""
}

class DataAdapter {
    static toUserModel = (apiUser) => {
        const { avatar, email, first_name, uuid } = apiUser;
        return {
            avatar,
            email,
            first_name,
            uuid
        }
    }

    static toContactModel = (apiModel) => {
        if (apiModel) {
            const { first_name, last_name, email, phone_number, label, best_time_to_contact, uuid } = apiModel;
            return {
                first_name: first_name ? first_name : DefaultText.noContent,
                last_name: last_name ? last_name : DefaultText.noContent,
                email: email ? email : DefaultText.noContent,
                phone_number: phone_number ? phone_number : DefaultText.noContent,
                label: label ? label : DefaultText.noContent,
                best_time_to_contact: best_time_to_contact ? best_time_to_contact : DefaultText.noContent,
                uuid
            }
        }
        return {
            first_name: DefaultText.noContent,
            last_name: DefaultText.noContent,
            email: DefaultText.noContent,
            phone_number: DefaultText.noContent,
            label: DefaultText.noContent,
            best_time_to_contact: DefaultText.noContent,
        }
    }

    static toClientModel = (apiClient) => {
        const { contacts, private_notes, uuid } = apiClient;
        if (contacts && contacts.length === 1) {
            contacts.push(this.toContactModel());
        }
        return {
            contacts: contacts.map((contact) => this.toContactModel(contact)),
            private_notes: private_notes ? private_notes : DefaultText.noContent,
            uuid
        }
    }

    static toTaskModel = (apiTask) => {
        const { category, is_completed, step, uuid } = apiTask;
        return {
            category: category ? category : DefaultText.noContent,
            is_completed,
            step: step ? step : DefaultText.noContent,
            uuid
        }
    }

    static toEventModel = (apiEvent, type = "event") => {
        if (apiEvent) {
            const { 
                event_name, 
                package_uuid, 
                shoot_date, 
                uuid,
                blog_link,
                edit_image_deadline,
                gallery_link,
                notes,
                shoot_location,
                shoot_time,
                reception_location,
                wedding_location,
                coordinator_name
            } = apiEvent;
    
            const baseEvent = {
                event_name: event_name ? event_name : DefaultText.noContent,
                package_uuid,
                shoot_date: shoot_date ? formatDate(shoot_date) : DefaultText.noContent,
                uuid,
                blog_link: blog_link ? blog_link : DefaultText.noContent,
                gallery_link: gallery_link ? gallery_link : DefaultText.noContent,
                notes: notes ? notes : DefaultText.noContent,
                edit_image_deadline: edit_image_deadline ? formatDate(edit_image_deadline) : DefaultText.noContent,
                shoot_time: shoot_time ? shoot_time : DefaultText.noContent,
            }
    
            if (event_name.match(/wedding/i)) {
                const weddingEvent = {
                    reception_location: reception_location ? reception_location : DefaultText.noContent,
                    wedding_location: wedding_location ? wedding_location : DefaultText.noContent,
                    coordinator_name: coordinator_name ? coordinator_name : DefaultText.noContent,
                }
                return Object.assign(baseEvent, weddingEvent)
            } else {
                const event = {
                    shoot_location: shoot_location ? shoot_location : DefaultText.noContent,
                }
                return Object.assign(baseEvent, event)
            }
        }
        if (type === "event") {
            return {
                event_name: "Engagement",
                shoot_date: DefaultText.noContent,
                blog_link: DefaultText.noContent,
                gallery_link: DefaultText.noContent,
                notes: DefaultText.noContent,
                edit_image_deadline: DefaultText.noContent,
                shoot_time: DefaultText.noContent,
                shoot_location: DefaultText.noContent,
            }
        } else {
            return {
                event_name: "Wedding",
                shoot_date: DefaultText.noContent,
                blog_link: DefaultText.noContent,
                gallery_link: DefaultText.noContent,
                notes: DefaultText.noContent,
                edit_image_deadline: DefaultText.noContent,
                shoot_time: DefaultText.noContent,
                reception_location: DefaultText.noContent,
                wedding_location: DefaultText.noContent,
                coordinator_name: DefaultText.noContent,
            }
        }
    }

    static toPackageModel = (apiPackage) => {
        if (apiPackage) {
            const { 
                package_name, 
                uuid, 
                proposal_signed,
                package_contents,
                package_price,
                retainer_price,
                retainer_paid_amount,
                retainer_paid,
                discount_offered,
                balance_remaining,
                balance_received,
                wedding_included,
                engagement_included,
                upcoming_shoot_date
            } = apiPackage;

            return {
                package_name: package_name ? package_name : DefaultText.nothing,
                proposal_signed,
                package_contents: package_contents ? package_contents : DefaultText.nothing,
                package_price: package_price >= 0 ? convertPenniesToDollars(package_price) : DefaultText.noContent,
                retainer_price: retainer_price >= 0 ? convertPenniesToDollars(retainer_price) : DefaultText.noContent,
                retainer_paid_amount: retainer_paid_amount >= 0 ? convertPenniesToDollars(retainer_paid_amount) : DefaultText.noContent,
                retainer_paid,
                discount_offered: discount_offered >= 0 ? convertPenniesToDollars(discount_offered) : DefaultText.noContent,
                balance_remaining: balance_remaining >= 0 ? convertPenniesToDollars(balance_remaining) : DefaultText.noContent,
                balance_received,
                uuid,
                upcoming_shoot_date: upcoming_shoot_date ? formatDate(upcoming_shoot_date) :  DefaultText.noContent,
                wedding_included,
                engagement_included
            }
        }

        return {
            package_events: [],
            package_name: DefaultText.nothing,
            upcoming_shoot_date: DefaultText.noContent,
            proposal_signed: false,
            package_contents: DefaultText.nothing,
            package_price: convertPenniesToDollars(0),
            retainer_price: convertPenniesToDollars(0),
            retainer_paid_amount: convertPenniesToDollars(0),
            retainer_paid: false,
            discount_offered: convertPenniesToDollars(0),
            balance_remaining: convertPenniesToDollars(0),
            balance_received: false,
            wedding_included: false,
            engagement_included: false
        }
    }

    static toFullClientDataModel = (client) => {
        const data = {
            client: this.toClientModel(client),
            current_stage: this.toTaskModel(client.current_stage),
            package: this.toPackageModel(client.package),
            events: client.package && client.package.package_events && client.package.package_events.map(event => this.toEventModel(event))
        }

        return data;
    }

    static toPartialClientDataModel = (apiClient) => {
        const { client_first_name, partner_first_name, package_name, current_stage, upcoming_shoot_date, uuid } = apiClient;
        return {
            partner_first_name: partner_first_name ? partner_first_name : DefaultText.noContent,
            client_first_name: client_first_name ? client_first_name : DefaultText.noContent,
            package_name: package_name ? package_name : DefaultText.noContent,
            current_stage: this.toTaskModel(current_stage),
            upcoming_shoot_date: upcoming_shoot_date ? formatDate(upcoming_shoot_date) : DefaultText.noContent,
            uuid
        }
    }

    static toAllClientDataModel = (apiUserClients) => {
        if (apiUserClients.length === 0) {
            return [];
        }

        return apiUserClients.map(client => this.toFullClientDataModel(client))
    }

    static toAllClientPartialDataModel = (apiUserClients) => {
        if (apiUserClients.length === 0) {
            return [];
        }

        return apiUserClients.map(client => this.toPartialClientDataModel(client));
    }

    static toApiReadyClient = (values) => {
        Object.keys(values).forEach(key => {
            const value = values[key];
            if (typeof value === 'object') {
                DataAdapter.toApiReadyClient(value)
            }
            if (typeof value === 'boolean') {
                return;
            }
            if (value === DefaultText.noContent || value === DefaultText.nothing) {
                values[key] = null;
                return;
            }
            if (Number(value) || value === "0.00") {
                values[key] = convertDollarsToPennies(value);
                return;
            }
        })

        return values;
    }
}

export default DataAdapter;